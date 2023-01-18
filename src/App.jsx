import React, { useState, useEffect } from 'react';
import './App.css';

import { ReactComponent as DiceIcon } from './assets/icon-dice.svg';
import patternDividerMobile from './assets/pattern-divider-mobile.svg';
import patternDividerDesktop from './assets/pattern-divider-desktop.svg';

const defaultState = { id: 0, advice: 'Click the shuffle button below for advice' };

function App() {
	const [error, setError] = useState(null);
	// ADVICE SLIP API STATE MANAGEMENT
	const [advice, setAdvice] = useState(defaultState);
	// Button spinning state
	const [buttonSpinningActive, setButtonSpinningActive] = useState(false);

	async function fetchAdviceHandler() {
		setButtonSpinningActive(true);
		setError(null);
		try {
			const response = await fetch('https://api.adviceslip.com/advice');

			if (!response.ok) {
				throw new Error('Something went wrong here..');
			}

			const data = await response.json();
			setAdvice(data.slip);
			setButtonSpinningActive(false);
		} catch (error) {
			setError(error.message);
		}
	}
	// END

	// Button Animation State Management
	const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

	const btnClasses = `button ${btnIsHighlighted ? 'rotate' : ''}`;

	useEffect(() => {
		if (advice !== defaultState) {
			setBtnIsHighlighted(true);
		}

		const timer = setTimeout(() => {
			setBtnIsHighlighted(false);
		}, 800);

		return () => {
			clearTimeout(timer);
		};
	}, [buttonSpinningActive, advice]);
	// END

	return (
		<main className='advice'>
			<div className='advice__container'>
				<h1 className='heading'>Advice #{advice.id}</h1>

				<div className='quote-container'>
					{!error && <p className='quote'>{advice.advice}</p>}
					{error && <p className='quote error'>{error}</p>}
				</div>

				<picture className='divider-container'>
					<source media='(max-width: 767px)' srcSet={patternDividerMobile} />
					<source media='(min-width: 768px)' srcSet={patternDividerDesktop} />
					<img src={patternDividerMobile} alt='divider' />
				</picture>

				<button onClick={fetchAdviceHandler} className={btnClasses}>
					<DiceIcon />
				</button>
			</div>
		</main>
	);
}

export default App;
