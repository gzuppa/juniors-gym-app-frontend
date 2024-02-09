import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import useMembers from "../hooks/useMembers";
import NewWarehouseArticleModal from "../components/Modals/NewWarehouseArticleModal";
import ArticlePreview from "../components/Previews/ArticlePreview";

const Warehouse = () => {
  const { allArticles, handleNewWarehouseArticleModal } = useMembers();

  const machines = allArticles.filter((element) => {
    return element.type === "Aparato";
  });
  const miscelaneous = allArticles.filter((element) => {
    return element.type === "Mercancía";
  });
  const other = allArticles.filter((element) => {
    return element.type === "Otro";
  });

  return (
    <>
      <h1 className="text-4xl text-yellow-300 font-raleway font-bold">
        Inventario
      </h1>
      <button
        type="button"
        onClick={handleNewWarehouseArticleModal}
        className="px-10 font-medium text-white py-2.5 bg-gradient-to-r whitespace-nowrap from-purple-950 to-purple-200 rounded-lg cursor-pointer font-raleway mt-5 mb-8 w-full md:w-auto flex items-center justify-center"
      >
        <LibraryAddOutlinedIcon className="mr-2" />
        Agregar artículo
      </button>
      <h1 className="text-2xl text-yellow-300 font-raleway font-bold">
        Aparatos
      </h1>
      <div className="bg-white shadow mt-5 rounded-lg">
        {machines.length ? (
          machines.map((article) => (
            <ArticlePreview key={article._id} article={article} />
          ))
        ) : (
          <p className="mt-5 text-center text-purple-800 uppercase">
            Aún no hay artículos agregados en esta categoría
          </p>
        )}
      </div>
      <h1 className="text-2xl text-yellow-300 mt-5 font-raleway font-bold">
        Mercancías
      </h1>
      <div className="bg-white shadow mt-5 rounded-lg">
        {miscelaneous.length ? (
          miscelaneous.map((article) => (
            <ArticlePreview key={article._id} article={article} />
          ))
        ) : (
          <p className="mt-5 text-center text-purple-800 uppercase">
            Aún no hay artículos agregados en esta categoría
          </p>
        )}
      </div>
      <h1 className="text-2xl text-yellow-300 mt-5 font-raleway font-bold">
        Otros
      </h1>
      <div className="bg-white shadow mt-5 rounded-lg">
        {other.length ? (
          other.map((article) => (
            <ArticlePreview key={article._id} article={article} />
          ))
        ) : (
          <p className="mt-5 text-center text-purple-800 uppercase">
            Aún no hay artículos agregados en esta categoría
          </p>
        )}
      </div>
      <NewWarehouseArticleModal />
    </>
  );
};

export default Warehouse;
