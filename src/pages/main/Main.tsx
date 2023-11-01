import { useMemo, useState } from "react";
import cl from "./Main.css";
import { TCard, TCardJson } from "../../types/TCards";
import menu from "../../data/menu.json";
import business from "../../data/1.json";
import mood from "../../data/2.json";
import newWords from "../../data/3.json";
import conditional from "../../data/4.json";
import { BiCards } from "../../components/BiCards";
import { NewWords } from "../../components/NewWords";

export function Main () {

	const [ isMenuOpen, setIsMenuOpen ] = useState<boolean>(false);
	const [ currentCard, setCurrentCard ] = useState<number>(0);
	const [ fullCard, setFullCard ] = useState<boolean>(true);
	const [ englishFirst, setEnglishFirst ] = useState<boolean>(true);
	const [ cards, setCards ] = useState<TCard[]>(business.items);
	const [ mode, setMode ] = useState<string>("cards");

	// const changeRootState = (object) => {
	// 	this.setState(object);
	// }

	const card = useMemo(() => {
		return cards[currentCard] ?? cards [0] ?? {
			id: undefined,
			source: "",
			translate: "",
			examples: undefined,
			learnLevel: undefined
		}
	}, [ currentCard ])

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

	const onSubjectClick = (id: number) => {
		let cards!:TCardJson;
		switch (id) {
		case 1:
			cards = business;
			break;
		case 2:
			cards = mood;
			break;
		case 3:
			cards = newWords;
			break;
		case 4:
			cards = conditional;
			break;
		default:
			cards = business;
		}
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

	const onMoodIdiomsClick = () => {
		reset();
		setCards(mood.items)
	}

	const onNewWordsClick = () => {
		reset();
		setCards(newWords.items)
	}

	const onConditionsClick = () => {
		reset();
		setCards(conditional.items)
	}

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
						{menu.source.map((item: any) => (
						<li key={item.id}>
							<a
							onClick={() => {
								onSubjectClick(item.id);
							}}
							href="#"
							className="text-white"
							>
							{item.title}
							</a>
						</li>
						))}
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
