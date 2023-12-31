import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import { Background, generateBackgroundIcons, Menu, Welcome, About, Skills, Projects, Education } from './components';
import { useGaTracker } from './helpers/useGaTracker';
import ReactSnowstorm from 'react-snowstorm';


const App = () => {
	const location = useLocation();
	const [hasLoaded, setHasLoaded] = useState(false);
	const [bg, setBg] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);

	useGaTracker(location);

	useEffect(() => {
		setBg(generateBackgroundIcons());
	}, []);

	return (
		<div className='App'>
			<></>
			<ReactSnowstorm
				flakeCount={100}
				flakeColor="#ffffff"
				flakeHeight={100}
				flakeWidth={10}
				flakesMax={200}
				useTwinkleEffect={true}
			/>
			<AnimateSharedLayout>
				<AnimatePresence exitBeforeEnter>
					{hasLoaded ? (
						<motion.div key='content' className='content'>
							<Background background={bg} hasLoaded={hasLoaded} />
							<AnimatePresence exitBeforeEnter>
								<Routes location={location} key={location.pathname}>
									<Route path='/' element={<About pageTitle={'About'} />} />
									<Route path='/skills' element={<Skills pageTitle={'Skills'} />} />
									<Route path='/projects' element={<Projects pageTitle={'Projects'} />} />
									<Route path='/education' element={<Education pageTitle={'Education'} />} />
								</Routes>
							</AnimatePresence>
							<Menu selectPage={setCurrentPage} currentPage={currentPage} />
						</motion.div>
					) : (
						<motion.div key='loader' className='loader'>
							<Background background={bg} hasLoaded={hasLoaded} />
							<Welcome setLoading={setHasLoaded} />
						</motion.div>
					)}
				</AnimatePresence>
			</AnimateSharedLayout>
		</div>
	);
};

export default App;
