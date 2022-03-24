import React, { useState, useEffect } from 'react';
import './index.css';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function Game({ pageSetter }) {

    const [randImage, setRandImage] = useState({ image: null, prompts: [] });
    const [btnColors, setBtnColors] = useState(['bg-amber-100', 'bg-amber-100', 'bg-amber-100', 'bg-amber-100']);
    const [choiceSelected, setChoiceSelected] = useState(-1);
    const [score, setScore] = useState(0);
    const [rounds, setRounds] = useState(0);

    useEffect(() => {
        fetch('http://localhost:5000/random-image')
            .then(res => res.json())
            .then(data => {
                shuffleArray(data.prompts);
                console.log(rounds);
                setRandImage({ image: data.image, prompts: data.prompts });
            })
            .catch(err => console.log(err));
    }, [rounds]);

    return (
        <div className='wrapper'>
            <div className="nav-buttons">
                <button className="nav-button" onClick={() => { pageSetter('home') }}>Home</button>
                <button className="nav-button" onClick={() => { pageSetter('results') }}>Results</button>
            </div>
            <div className='score max-w-2xl rounded-2xl overflow-hidden shadow-2xl bg-stone-50 p-5 mt-20'>
                {score}
            </div>
            <div class="max-w-2xl rounded-2xl overflow-hidden shadow-2xl bg-orange-400 p-10 mt-20 img-card">
                <img src={`data:image/png;base64, ${randImage.image}`} className="rounded-2xl" />
                <div className="multiple-choice">
                    {randImage.prompts.map((prompt, index) => {
                        return (
                            <button className={`choice ${btnColors[index]} ` + `${choiceSelected != -1 ? (index === choiceSelected ? 'text-white ' : '') : 'hover:bg-amber-50'} rounded-full shadow-xl p-2 text-center`} onClick={() => {
                                if (prompt.real === true && choiceSelected === -1) {
                                    let newBtnColors = btnColors.slice();
                                    newBtnColors[index] = 'bg-emerald-400';
                                    setBtnColors(newBtnColors);
                                    setChoiceSelected(index);
                                    setScore(score + 1);
                                } else if (prompt.real === false && choiceSelected === -1) {
                                    let newBtnColors = btnColors.slice();
                                    newBtnColors[index] = 'bg-red-500';
                                    setBtnColors(newBtnColors);
                                    setChoiceSelected(index);
                                }
                            }}>{prompt.prompt}</button>
                        )
                    }, this)}
                </div>
            </div>
            {choiceSelected !== -1 && (
                <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-4 font-title text-2xl mb-12 next-btn" onClick={() => {
                    let newBtnColors = btnColors.slice();
                    newBtnColors[choiceSelected] = 'bg-amber-100';
                    setBtnColors(newBtnColors);
                    setChoiceSelected(-1);
                    setRounds(rounds + 1);
                }}>
                    Next Round
                </button>
            )}
        </div>

    );
}

export default Game;