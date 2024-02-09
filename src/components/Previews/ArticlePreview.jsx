import { Link } from 'react-router-dom'

const ArticlePreview = ({ article }) => {
  const { name, description, price, _id } = article

  return (
    <div className="border-b p-5 flex justify-between items-center font-raleway">
      <div>
        <p className="text-xl mb-1">{name}</p>
        <p className="text-sm mb-1 text-gray-600">{description}</p>
        <p className="text-sm mb-1">
          Precio: $ {new Intl.NumberFormat().format(price)}
        </p>
      </div>
      <Link
        to={`${_id}`}
        className="text-purple-800 hover:text-purple-600 uppercase cursor-pointer text-sm font-raleway font-bold"
      >
        Ver detalles
      </Link>
    </div>
  )
}

export default ArticlePreview
