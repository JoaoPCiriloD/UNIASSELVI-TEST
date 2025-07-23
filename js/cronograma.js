const video_area = document.querySelector('.lista-links');

const nomeCoordenador = "Gabriela Pedrotti"
const linkVideoLibras = "https://www.youtube.com/embed/7SYHhwfZBQI"

video_area.innerHTML = `
                    <div class="data">
                        <img src="img/teacher.svg" alt="">
						<h5>${nomeCoordenador}</h5>
                    </div>
                    <div class="video-wrapper">
						<iframe title="Vídeo da Disciplina" width="1280" height="720"
						src="${linkVideoLibras}"
						allowfullscreen="true">
						</iframe>
					</div>
                `;