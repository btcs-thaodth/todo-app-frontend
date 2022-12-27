
import { Form } from 'antd';
import { useMemo, useState } from 'react';
import ColCard from 'src/app/components/Todo/ColCard';
import ModalCreateCard from 'src/app/components/Todo/ModalCreateCard';
import { CHANGE_STATUS_TODO_URL, CREATE_TODO_URL, DELETE_TODO_URL, GET_TODO_URL } from 'src/constants/urlTodoApi';
import useQuery from 'src/hooks/useQuery';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import useMutation from 'src/hooks/useMutation';
import { CreateTodoForm, TodoType } from 'src/models/Todo';
import { IoMdAdd } from 'react-icons/io'

const listStatus = ['todo', 'doing', 'done']

export default function Todo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleModal, setTitleModal] = useState('')
  const [form] = Form.useForm();
  const { t } = useTranslation()
  const {
    data, refetch
  } = useQuery<TodoType[]>(GET_TODO_URL)
  const { mutate } = useMutation()


  const listCard = useMemo(() => {
    const dataCard: Record<string, any[]> = {}

    listStatus.forEach((statusItem) => {
      dataCard[statusItem] = data?.filter((todo: TodoType) => todo.status === statusItem) || []
    })

    return dataCard
  }, [data])


  const handleOk = (value: CreateTodoForm) => {
    const values = {
      ...value,
      status: titleModal
    }
    mutate(CREATE_TODO_URL, {
      values,
      successMessage: t('todo.addSuccess'),
      errorMessage: t('todo.addError'),
      onSuccess: () => {
        setTitleModal('')
        setIsModalOpen(false);
        form.resetFields()
        refetch()
      }
    })
  };

  const handleCancel = () => {
    form.resetFields()
    setTitleModal('')
    setIsModalOpen(false);
  };
  const handleAddCard = (status: string) => {
    setTitleModal(status)
    setIsModalOpen(true);
  }
  const onDragEnd = (result: any) => {
    const values = {
      status: result.destination.droppableId
    }
    mutate(CHANGE_STATUS_TODO_URL + result.draggableId, {
      values,
      successMessage: t('todo.changeSuccess'),
      errorMessage: t('todo.changeError'),
      onSuccess: () => {
        refetch()
      }
    })
  }
  const handleDelete = (id: number) => {
    const values = {}
    mutate(DELETE_TODO_URL + id, {
      values,
      method: 'delete',
      successMessage: t('todo.deleteSuccess'),
      errorMessage: t('todo.deleteError'),
      onSuccess: () => {
        refetch()
      }
    })
  }
  return (
    <>
      <div style={{
        backgroundImage: `url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2296x1600/0fe6466794de82ed48b5fda61f3467e2/photo-1671119904316-3e7b29f954f2.jpg")`
      }} className='h-screen bg-center bg-no-repeat bg-cover'>
        <div className='p-10'>
          <div className="grid grid-cols-4 gap-4">
            <DragDropContext onDragEnd={onDragEnd}>
              {listStatus.map((status: string) => (
                <Droppable key={status} droppableId={status}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <div>
                        <div className="bg-[#ebecf0] rounded-md p-3">
                          <div className='font-semibold'>
                            {t(`todo.${status}`)}
                          </div>

                          {listCard[status].map((item: any, index: any) => (
                            <ColCard key={item.id} card={item} index={index} handleDelete={handleDelete} />
                          ))}

                          <div className='text-gray-500 mt-3 cursor-pointer text-sm' onClick={() => handleAddCard(status)}>
                            <div className='flex items-center'>
                              <IoMdAdd /> {t('todo.addCard')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Droppable>
              ))}
            </DragDropContext>
            <div>
              <div className="bg-[#00000014] hover:bg-[#00000029] p-3 rounded-md cursor-pointer">
                <div className='flex items-center'>
                  <IoMdAdd /> {t('todo.addList')}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModalCreateCard form={form} titleModal={titleModal} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
      </div>
    </>
  )
}
