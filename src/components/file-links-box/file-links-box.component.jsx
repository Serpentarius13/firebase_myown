import "./file-links-box.styles.less";

const FileLinksBox = ({ docs }) => {
  return (
    <div className="file-images">
      {" "}
      {docs.map(({ fileName, url }) => (
        <a target="_blank" key={Math.random() * 10000} href={url}>
          {" "}
          <img className="file-image" src={url} alt={fileName} />
        </a>
      ))}{" "}
    </div>
  );
};

export default FileLinksBox;
