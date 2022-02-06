import "./Loader.css";

interface LoaderProps {
  loaded: boolean;
}

const Loader: React.FC<LoaderProps> = (props) => {
  return (
    <section className={props.loaded ? "loader fade-out" : "loader"}>
      <section></section>
    </section>
  );
};

export default Loader;
