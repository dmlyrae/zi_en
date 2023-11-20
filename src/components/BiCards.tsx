import { ChangeEventHandler, Fragment, MouseEventHandler, MouseEvent, useState } from "react";
import { TCard, TExample } from "../types/TCards";
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
		setCurrentCard,
		fullCard, currentCard, length,
		card, englishFirst, 
	} = props;

	const [ answer, setAnswer ] = useState<[string, number]>(["", -1]);

	const plus = (e: MouseEvent) => {
		e.stopPropagation()
		setAnswer( _ => ["", -1]);
		setCurrentCard( (prev:number) => (prev + 1) % length );
	}

	const minus = (e: MouseEvent) => {
		e.stopPropagation()
		setAnswer( _ => ["", -1]);
		setCurrentCard( (prev:number) => (prev - 1) % length );
	}

	const goToEnd = (e: MouseEvent) => {
		e.stopPropagation()
		setAnswer( _ => ["", -1]);
		setCurrentCard( length - 1 );
	}

	const goToStart = (e: MouseEvent) => {
		e.stopPropagation()
		setAnswer( _ => ["", -1]);
		setCurrentCard( 0 );
	}

	const checkVariant = function(variant: string, index: number) {
		return function(e: MouseEvent) {
			e.stopPropagation()
			if (answer[0]) {
				return;
			}
			if (variant == card.translate) {
				const currentLevel = Number(localStorage.getItem(variant));
				if (Number.isNaN(currentLevel)) {
					localStorage.setItem(variant, "1");
				} else {
					localStorage.setItem(variant, String(currentLevel + 1));
				}
			}
			setAnswer([variant, index]);
		}
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
		<Row 
			onClick={(e: MouseEvent<HTMLDivElement>) => {
				setAnswer(["", -1])
			}} 
			style={{ 
				cursor: 'pointer', 
				borderRadius: 10 ,
				marginTop: "1em",
				marginBottom: "1em",
			}} 
		>
			<Col
				onClick={minus} 
				md={{
					span: 0,
				}}
				sm={{
					span: 1,
				}}
				className="md-p-5 sm-p-1"
			>
				<div
					className={`d-flex justify-content-center align-items-center h-full 
						flex-row bg-info bg-info box-shadow md-p-5 sm-p-1 rounded
						hover-bg-opacity-80
					`}
					style={{
						height: "100%"
					}}
				>
					<CaretLeft 
						size={"3em"}
						color="white"
					/>
				</div>
			</Col>
			<Col
				md={{
					span: 10,
					offset: 0,
				}}
				className="container bg-light box-shadow py-5"
			>
					<h1 className="jumbotron-heading">{card.source}</h1>
					{fullCard &&
						<p className="lead text-muted">{card.translate}</p>
					}
					{
						card.examples &&
							card.examples.map((example: TExample, index: number) => {
								return (
									<Fragment
										key={index}
									>
										<Row 
											key={index} 
											color="success"
											style={{
												textAlign: "center",
											}}
										>
											<Col 
												md={{ span: 6, offset: 3 }}
												color="success"
											>
												{example.sentence}
											</Col>
										</Row>
										{
											fullCard && example.translate && (
													<Row 
														key={index} 
														color="secondary"
														style={{
															textAlign: "center",
														}}
													>
													<Col md={{ span: 6, offset: 3 }}>
														{example.translate}
													</Col>
												</Row>
											)
										}
									</Fragment>
							)} )
					}
					{
						card.variants && !fullCard && (
							<Row 
								color="success"
								style={{
								textAlign: "center",
								}}
							>
						{
							card.variants.map( (variant, i) => (
								<Col 
									md={{ span: 6 }}
									color="success"
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<Button
										onClick={checkVariant(variant, i)}
										variant={
											(answer[1] == i ? answer[0] === card.translate ? "success" : "danger" : "primary")
										}
										style={{
											width: "100%",
											margin: "1em",
										}}
									>
										{
											variant
										}
									</Button>
								</Col>
							))
						}
							</Row>
						)
					}		
					{
						answer[0] && (
							<div className="text-muted flex gap-2 mt-4">
								<Button 
									onClick={(e: MouseEvent) => {
										setAnswer(["", -1]);
										plus(e);
									}} 
									className="fa fa-fast-forward w-100"
									variant="outline-info"
									style={{
										margin: ".5em"
									}}
								>
									{"Next"}
								</Button>
							</div>
						)
					}
			</Col>
			<Col
				onClick={plus} 
				md={{
					span: 1,
				}}
				sm={{
					span: 1,
				}}
				className="md-p-5 sm-p-1"
			>
				<div
					className={`d-flex justify-content-center align-items-center h-full 
						flex-row bg-info bg-info box-shadow md-p-5 sm-p-1 rounded
						hover-bg-opacity-80
					`}
					style={{
						height: "100%"
					}}
				>
					<CaretRight 
						size={"3em"}
						color="white"
					/>
				</div>
			</Col>
		</Row>
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