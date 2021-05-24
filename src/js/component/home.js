import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Home() {
	const [songList, setSongList] = useState([]);
	const [nowPlay, setNowPlay] = useState("");
	const AUDIO = document.querySelector("audio");
	const audio = document.getElementById("audio");
	const newUrl = "https://assets.breatheco.de/apis/sound/";
	const [tempIndex, setTempIndex] = useState(-1);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(function(responseAsJson) {
				setSongList(responseAsJson);
			})
			.catch(function(error) {
				"Looks like there was a problem! ", error;
			});
	}, []);

	const songMap = songList.map((song, index) => {
		return (
			<li
				key={index}
				onClick={() => {
					let newurl = newUrl.concat(song.url);
					setNowPlay(newurl);
					//indice de la iteracion // con song.id no es igual que el index
					//index cuenta desde 0 y en el array desde 1
					setTempIndex(index);
				}}>
				{song.name}
			</li>
		);
	});

	//https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_audio_play "como se usa"
	const playAudio = () => {
		AUDIO.play();
	};

	const pauseAudio = () => {
		AUDIO.pause();
	};

	const previousSong = songIndex => {
		console.log("previusSong" + songIndex);
		let newurl = "";

		if (songList[songIndex - 1]) {
			newurl = newUrl.concat(songList[songIndex - 1].url);
			setNowPlay(newurl);

			setTempIndex(songIndex - 1);
		} else {
			newurl = newUrl.concat(songList[songList.length - 1].url);

			setNowPlay(newurl);
			setTempIndex(songList.length - 1);
		}
		console.log("previusSong" + songIndex);
	};

	const nextSong = songIndex => {
		console.log(tempIndex);
		console.log("nextSong" + songIndex);
		let newurl = "";
		if (songList[songIndex + 1]) {
			newurl = newUrl.concat(songList[songIndex + 1].url);
			setNowPlay(newurl);

			setTempIndex(songIndex + 1);
		} else {
			newurl = newUrl.concat(songList[0].url);

			setNowPlay(newurl);

			setTempIndex(0);
		}
		console.log("nextSong" + songIndex);
	};

	const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];

	const numBalls = 50;
	const balls = [];

	for (let i = 0; i < numBalls; i++) {
		let ball = document.createElement("div");
		ball.classList.add("ball");
		ball.style.background =
			colors[Math.floor(Math.random() * colors.length)];
		ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
		ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
		ball.style.transform = `scale(${Math.random()})`;
		ball.style.width = `${Math.random()}em`;
		ball.style.height = ball.style.width;

		balls.push(ball);
		document.body.append(ball);
	}

	// Keyframes

	balls.forEach((el, i, ra) => {
		let to = {
			x: Math.random() * (i % 2 === 0 ? -11 : 11),
			y: Math.random() * 12
		};

		let anim = el.animate(
			[
				{ transform: "translate(0, 0)" },
				{ transform: `translate(${to.x}rem, ${to.y}rem)` }
			],
			{
				duration: (Math.random() + 1) * 2000,
				direction: "alternate",
				fill: "both",
				iterations: Infinity,
				easing: "ease-in-out"
			}
		);
	});

	// animacion

	return (
		<div className="container">
			<ol className="songsList">{songMap}</ol>

			<footer>
				<button id="previous" onClick={() => previousSong(tempIndex)}>
					<i className="fas fa-backward"></i>
				</button>
				<button id="pause" onClick={pauseAudio}></button>
				<audio id="audio" controls src={nowPlay} autoPlay></audio>
				<button id="play" onClick={() => playAudio(tempIndex)}></button>

				<button id="next" onClick={() => nextSong(tempIndex)}>
					<i className="fas fa-forward"></i>
				</button>
			</footer>
		</div>
	);
}
