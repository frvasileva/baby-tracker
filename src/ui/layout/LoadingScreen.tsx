import "./Layout.scss";
import "./LoadingScreen.scss";

export default function LoadingScreen(props: any) {
  var loadingText = "";
  if (props.loadingText === "" || typeof props.loadingText === "undefined") {
    loadingText = "Loading...";
  } else {
    loadingText = props.loadingText;
  }

  return <div className="loader">Loading...</div>;
}
