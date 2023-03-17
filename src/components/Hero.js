import { IMAGE_PATH, URL_IMAGE } from "../api/Api";
import YouTube from "react-youtube";

function Hero(props) {
  // const to change decrease float for dates and vote
  const releaseDate = () => {
    return parseFloat(props.movie.release_date).toFixed();
  };

  const averageVote = () => {
    return parseFloat(props.movie.vote_average).toFixed(1);
  };

  return (
    <div className="subpixel-antialiased">
      {props.movie ? (
        <div
          className="viewtrailer"
          style={{
            backgroundImage: `url("${IMAGE_PATH}${props.movie.backdrop_path}")`,
          }}
        >
          {props.playing ? (
            <>
              <YouTube
                videoId={props.trailer.key}
                className="reproductor container"
                containerClassName={"youtube-container amru"}
                opts={{
                  width: "100%",
                  height: "100%",
                  playerVars: {
                    autoplay: 1,
                    controls: 1,
                    cc_load_policy: 0,
                    fs: 0,
                    iv_load_policy: 0,
                    modestbranding: 0,
                    rel: 0,
                    showinfo: 0,
                  },
                }}
              />
              <button onClick={() => props.setPlaying(false)} className="boton">
                Close
              </button>
            </>
          ) : (
            <div className=" h-full">
              <div className="">
                {props.trailer ? (
                  <button
                    className="boton"
                    onClick={() => props.setPlaying(true)}
                    type="button"
                  >
                    Play Trailer
                  </button>
                ) : (
                  "Sorry, no trailer available"
                )}
              </div>
              <div className="flex flex-row">
                <img
                  className=" border-4 border-r-8 border-b-8  border-black  "
                  src={`${URL_IMAGE + props.movie.poster_path}`}
                  alt=""
                  height={300}
                  width="20%"
                />
                <div className="flex flex-col pl-4 ">
                  <h2 className="text-white text-2xl italic ">
                    {props.movie.tagline}
                  </h2>

                  <p className="text-white text-lg w-1/2">
                    {props.movie.overview}
                  </p>
                  <div className="flex flex-col pt-10 text-4xl gap-4">
                    <h1 className="text-white">{props.movie.title}</h1>
                    <h2 className="text-white text-m">Year: {releaseDate()}</h2>

                    <div
                      className={
                        averageVote() >= 8
                          ? "bg-gold"
                          : averageVote() >= 7
                          ? "bg-green"
                          : "bg-red"
                      }
                    >
                      {" "}
                      <h2 className="text-white inline-block">
                        {averageVote()}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Hero;
