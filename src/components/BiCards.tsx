import { ChangeEventHandler, MouseEventHandler } from "react";
import { TCard } from "../types/TCards";
import { Button, Col, Row } from "react-bootstrap";
import { Back, CaretLeft, CaretRight, Forward, SkipBackward, SkipBackwardBtn, SkipForward } from "react-bootstrap-icons";

export function BiCards (props: {
	toggleFullCards: ChangeEventHandler<HTMLDivElement>;
	reverseCards: Function; 
	onClickHandler: MouseEventHandler<HTMLDivElement>;
	card: TCard;
	setCurrentCard: Function;
	fullCard?: boolean;
	currentCard: number;
	length: number;
	englishFirst?: boolean;
}
) {
	const { toggleFullCards, reverseCards, 
		onClickHandler, setCurrentCard,
		fullCard, currentCard, length,
		card, englishFirst,
	} = props;

	const plus = () => {
		setCurrentCard( (prev:number) => (prev + 1) % length );
	}

	const minus = () => {
		setCurrentCard( (prev:number) => (prev - 1) % length );
	}

	const goToEnd = () => {
		setCurrentCard( length - 1 );
	}

	const goToStart = () => {
		setCurrentCard( 0 );
	}

	return (
	<section className="jumbotron specialjum text-center">
		<div
			style={{
				marginTop: "1em",
				marginBottom: "1em"
			}}
		>
			<form action="" className="" >
				<div className="d-flex justify-content-center">
					<div className="col-md-6 text-right">
						<div className="form-check">
							<label className="form-check-label">
								<input 
									onChange={toggleFullCards} 
									className="form-check-input" 
									type="checkbox" 
									checked={fullCard} 
								/>
								Show with translation
					</label>
						</div>
					</div>
					<div className="col-md-6 text-left">
						<div className="form-check">
							<label className="form-check-label">
								<input onChange={() => reverseCards()} className="form-check-input" type="checkbox" checked={englishFirst} />
								Show English first
							</label>
						</div>
					</div>
				</div>
			</form>
		</div>
		<div 
			onClick={onClickHandler} 
			style={{ 
				cursor: 'pointer', 
				borderRadius: 10 ,
				marginTop: "1em",
				marginBottom: "1em"
			}} 
			className="container bg-light box-shadow py-5"
		>
			<h1 className="jumbotron-heading">{card.source}</h1>
			{fullCard &&
				<p className="lead text-muted">{card.translate}</p>
			}
			{
				card.examples &&
					card.examples.map((example: any, index: number) => {
						return (
						<Row 
							key={index} 
							style={{
								color:'Green',
								textAlign: "center",
							}}
						>
							<Col md={{ span: 6, offset: 3 }}>
								{example}
							</Col>
						</Row>
					)} )
			}
		</div>
		<div className="text-muted flex gap-2">
			<Button 
				onClick={goToStart} 
				className="fa fa-fast-backward"
				variant="outline-info"
				style={{
					margin: ".5em"
				}}
			>
				<SkipBackward 
					onClick={goToStart} 
				/>
			</Button>
			<Button 
				onClick={minus} 
				className="fa fa-step-backward"
				variant="outline-info"
				style={{
					margin: ".5em"
				}}
			>
				<CaretLeft 
					onClick={minus}
				/>
			</Button>
			<Button 
				className="fa fa-step-backward"
				variant="success"
				style={{
					margin: ".5em"
				}}
			>
				{currentCard + 1}
			</ Button>
			<Button 
				onClick={plus} 
				className="fa fa-step-forward"
				variant="outline-info"
				style={{
					margin: ".5em"
				}}
			>
				<CaretRight 
					onClick={plus} 
				/>
			</Button>
			<Button 
				onClick={goToEnd} 
				className="fa fa-fast-forward"
				variant="outline-info"
				style={{
					margin: ".5em"
				}}
			>
				<SkipForward 
					onClick={goToEnd} 
				/>
			</Button>
		</div>
	</section>
	)
}