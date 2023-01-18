import React from 'react';
import './App.css';

import { ReactComponent as DiceIcon } from './assets/icon-dice.svg';
import patternDividerMobile from './assets/pattern-divider-mobile.svg';
import patternDividerDesktop from './assets/pattern-divider-desktop.svg';

function App() {
	return (
		<main className='advice'>
			<div className='advice__container'>
				<h1 className='heading'>Advice #{117}</h1>

				<p className='quote'>
					It is easy to sit up and take notice, what's difficult is getting up and taking
					action.
				</p>

				<picture className='divider-container'>
					<source media='(max-width: 767px)' srcSet={patternDividerMobile} />
					<source media='(min-width: 768px)' srcSet={patternDividerDesktop} />
					<img src={patternDividerMobile} alt='' />
				</picture>

				<button className='button'>
					<DiceIcon />
				</button>
			</div>
		</main>
	);
}

export default App;
