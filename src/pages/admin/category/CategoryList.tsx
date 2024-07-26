import { DeleteOutlined, EditOutlined, PlusCircleFilled, QuestionCircleOutlined } from "@ant-design/icons"
import { Button, Popconfirm, Table } from "antd"
import { Link, NavLink } from "react-router-dom"
import { Category } from "../../../common/types/Category"
import { useCategory } from "../../../contexts/CategoryContext"
const CategoryList = () => {
  const { state, Delete_Category } = useCategory()
  const dataSource = state.categories.map((category) => ({
    key: category._id,
    ...category,
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
      dataIndex: "name"
    },
    {
      key: 'desc',
      title: 'Description',
      dataIndex: "description"
    },

    {
      title: 'Action',
      key: 'action',
      render: (_id: string, category: Category) => {
        return (
          <>
            <Button type="primary" icon={<EditOutlined />}
              onClick={() => <NavLink to={`/edit/${category._id}`} />}
              className="mr-2 bg-yellow-500">
              Edit
            </Button>
            <Popconfirm
              title="Delete product"
              description="Are you sure to delete this product?"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              onConfirm={() => Delete_Category(category._id!)}
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
        <Link to={'/admin/category/add'}>
          <Button type="primary">
            <PlusCircleFilled />Add Category</Button>
        </Link>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div >
  )
}

export default CategoryList
