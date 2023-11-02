import { useEffect, useMemo, useState } from "react";
import cl from "./Main.css";
import { TCard, TCardJson } from "../../types/TCards";
import { BiCards } from "../../components/BiCards";
import { NewWords } from "../../components/NewWords";
import axios from "axios";

export function Main () {

	const [ isMenuOpen, setIsMenuOpen ] = useState<boolean>(false);
	const [ currentCard, setCurrentCard ] = useState<number>(0);
	const [ fullCard, setFullCard ] = useState<boolean>(false);
	const [ englishFirst, setEnglishFirst ] = useState<boolean>(true);
	const [ tags, setTags ] = useState<string[]>([]);
	const [ cards, setCards ] = useState<TCard[]>([]);
	const [ mode, setMode ] = useState<string>("cards");

	const allWords = useMemo(() => {
		if (!Array.isArray(cards)) return ["1", "2", "3", "4"];
		return cards.map( c => c.translate );
	}, [ cards ])

	const returnVariants = (source: string) => {
		const variants = new Set<string>();
		variants.add(source);
		let counter = 0;
		let boundaryCounter = 0;
		while (counter < 3 && boundaryCounter < 100) {
			const candidate = allWords[Math.floor(Math.random() * allWords.length)];
			if (!variants.has(candidate)) {
				variants.add(candidate);
				counter++;
			}
			boundaryCounter++;
		}
		return Array.from(variants)
	}

	const card = useMemo(() => {
		const result = cards[currentCard] ?? cards[0] ?? {
			id: undefined,
			source: "",
			translate: "",
			examples: undefined,
			learnLevel: undefined,
		}
		result.variants = returnVariants(result.translate);
		return result;
	}, [ currentCard, cards ])

	const onClickHandler = () => {
		setCurrentCard( prev => (prev + 1) % cards.length );
	}

	const toggleFullCards = () => {
		setFullCard( prev => !prev )
	}

	const reverseCards = () => {
		setEnglishFirst( prev => !prev )
		setCards( prev => {
			return prev.map( card => ({
				...card,
				source: card.translate,
				translate: card.source,
			}))
		})
	}

	const onSubjectClick = (tag: string) => {
		let cards!:TCardJson;
		setIsMenuOpen(false);
		setCurrentCard(0);
		setFullCard(true);
		setEnglishFirst(true);
		setCards(cards.items);
	}

	const reset = () => {
		setIsMenuOpen(false);
		setCurrentCard(0);
		setFullCard(true);
		setEnglishFirst(true);
	}

	useEffect(() => {
		axios.get("https://raw.githubusercontent.com/dmlyrae/english_cards/main/main.json",
		{ responseType: "json" })
		.then(function (response) {
			const responseCards = response.data as TCard[];
			if (Array.isArray(responseCards)) {
				const cardsTags = new Set();
				responseCards.forEach( (card: TCard) => {
					if (!("source" in card)) return;
					const cardName = card.source;
					const learnLevel = Number(localStorage.getItem(cardName));
					card.learnLevel = Number.isNaN(learnLevel) ? 0 : learnLevel;
					if (Array.isArray(card?.tags)) {
						card.tags.forEach( tag => cardsTags.add(tag) );
					}
				})
				responseCards.sort( (a, b) => {
					return (b.learnLevel ?? 0) - (a.learnLevel ?? 0);
				})
			}
			setCards(responseCards);
			setCurrentCard(0)
			console.log(responseCards)
		});
	}, [])

	return (
	<div className="App">
		<header className="App-header">
		  <div
			className={
			  "bg-dark collapse " + (isMenuOpen ? "show" : "")
			}
			id="navbarHeader"
		  >
			<div className="container">
			  <div className="row">
				<div className="col-sm-8 col-md-7 py-4">
				  <h4 className="text-white">About</h4>
				  <p className="text-muted">
					Choose a subject and train the phrases.
				  </p>
				</div>
				<div className="col-sm-4 offset-md-1 py-4">
				  	<h4 className="text-white">
						Темы
					</h4>
					<ul className="list-unstyled">
						{
							tags.map((tag: string, i) => (
							<li key={i}>
								<a
								onClick={() => {
									onSubjectClick(tag);
								}}
								href="#"
								className="text-white"
								>
								{tag}
								</a>
							</li>
							))
						}
					</ul>
				</div>
			  </div>
			</div>
		  </div>
		  <div className="navbar navbar-dark bg-dark box-shadow">
			<div className="container d-flex justify-content-between">
			  <a
				href="javascript:;"
				className="navbar-brand d-flex align-items-center"
			  >
				<svg
				  xmlns="http://www.w3.org/2000/svg"
				  width="20"
				  height="20"
				  viewBox="0 0 24 24"
				  fill="none"
				  stroke="currentColor"
				  strokeWidth="2"
				  strokeLinecap="round"
				  strokeLinejoin="round"
				  className="mr-2"
				>
				  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
				  <circle cx="12" cy="13" r="4"></circle>
				</svg>
				<strong>English :)</strong>
			  </a>
			  <button
				onClick={() => { setIsMenuOpen( prev => !prev) }}
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarHeader"
				aria-controls="navbarHeader"
				aria-expanded="true"
				aria-label="Toggle navigation"
			  >
				<span className="navbar-toggler-icon"></span>
			  </button>
			</div>
		  </div>
		</header>
		<main>
			{
				mode === "cards" && (
					<BiCards
						toggleFullCards={toggleFullCards}
						reverseCards={reverseCards}
						onClickHandler={onClickHandler} 
						card={card}
						setCurrentCard={setCurrentCard} 
						currentCard={currentCard} 
						length={cards.length}					
						fullCard={fullCard}
					/>
				)
			}
			{mode === "new-words" && <NewWords />}
		</main>
	</div>
	)
}
