import { PlusCircleFilled, QuestionCircleOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { Button, Popconfirm, Table } from "antd"
import { Link, NavLink } from "react-router-dom"
import { Product } from "../../../common/types/Product"
import { useProduct } from "../../../contexts/Product.Context"
const ProductList = () => {
  const { state, Delete_Product } = useProduct()
  const dataSource = state.products.map((product) => ({
    key: product._id,
    ...product,
  }))
  const columns = [
    {
      key: 'id',
      title: 'ID',
      dataIndex: "_id"
    },
    {
      key: 'name',
      title: 'Name',
      dataIndex: "title"
    },
    {
      key: 'sku',
      title: 'SKU',
      dataIndex: "sku"
    },
    {
      key: 'price',
      title: 'Price',
      dataIndex: "price"
    },
    {
      key: 'desc',
      title: 'Description',
      dataIndex: "description"
    },
    {
      key: 'stock',
      title: 'Stock',
      dataIndex: "stock"
    },
    {
      key: 'thumbnail',
      title: 'Thumbnail',
      dataIndex: "thumbnail",
      render: (img: string) => <img src={img} alt="text" style={{ width: 200, height: 100 }} />
    },

    {
      title: 'Action',
      key: 'action',
      render: (_id: string, product: Product) => {
        return (
          <>
            <Button type="primary" icon={<EditOutlined />}
              onClick={() => <NavLink to={`/edit/${product._id}`} />}
              className="mr-2 bg-yellow-500">
              Edit
            </Button>
            <Popconfirm
              title="Delete product"
              description="Are you sure to delete this product?"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              onConfirm={() => Delete_Product(product._id!)}
            >

              <Button type="primary" danger icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </>
        )
      }
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold">Product</h1>
        <Link to={'/admin/products/add'}>
          <Button type="primary">
            <PlusCircleFilled />Add product</Button>
        </Link>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div >
  )
}

export default ProductList
