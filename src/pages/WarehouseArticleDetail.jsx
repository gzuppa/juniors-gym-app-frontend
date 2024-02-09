import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Loader from "../assets/files/Loader";
import useMembers from "../hooks/useMembers";

const WarehouseArticleDetail = () => {
  const params = useParams();
  const { article, getArticle, loading } = useMembers();

  useEffect(() => {
    getArticle(params.id);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="flex justify-between">
        <h1 className="font-bold text-yellow-300 text-4xl font-raleway">
          {article.name}
        </h1>
      </div>

      <div className="bg-white py-8 mt-10 rounded-xl font-raleway">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-6">
                <img
                  className="w-full h-full object-cover"
                  src={article.image}
                  alt="Product Image"
                />
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-purple-800 mb-2">
                {article.name}
              </h2>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-purple-800">Precio: </span>
                  <span className="text-purple-800">
                    $ {new Intl.NumberFormat().format(article.price)}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-purple-800">Status: </span>
                  <span className="text-purple-800">{article.status}</span>
                </div>
              </div>
              <div>
                <span className="font-bold text-purple-800">
                  Descripcion del artículo:
                </span>
                <p className="text-purple-800 text-sm mt-2">
                  {article.description}
                </p>
              </div>
              <div className="mr-4 mt-3">
                <span className="font-bold text-purple-800">
                  Cantidad en stock:{" "}
                </span>
                <span className="text-purple-800">{article.stock}</span>
              </div>
              <div className="mr-4 mt-6">
                <Link
                  className="px-10 font-medium text-white py-2.5 bg-gradient-to-r whitespace-nowrap from-purple-950 to-purple-200 rounded-lg cursor-pointer font-raleway"
                  to={`/admin/warehouse/edit/${params.id}`}
                >
                  <EditOutlinedIcon /> Editar
                </Link>
                <Link
                  className="ml-4 px-10 font-medium text-white py-2.5 bg-gradient-to-r whitespace-nowrap from-purple-950 to-purple-200 rounded-lg cursor-pointer font-raleway"
                  to={`/admin/warehouse`}
                >
                  <EditOutlinedIcon /> Volver a inventario
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WarehouseArticleDetail;
