import { Button, Form, Input, Modal } from 'antd'
import { useTranslation } from 'react-i18next';
import { CreateTodoForm } from 'src/models/Todo';
interface Props {
    form: any,
    titleModal: string,
    isModalOpen: boolean,
    handleOk: (value: CreateTodoForm) => void,
    handleCancel: () => void
}
export default function ModalCreateCard({ form, titleModal, isModalOpen, handleOk, handleCancel }: Props) {
    const { t } = useTranslation()
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };
    return (
        <Modal
            open={isModalOpen}
            title={t(`todo.${titleModal}`)}
            onOk={() => handleOk}
            onCancel={handleCancel}
            footer={false}
        >
            <Form {...layout} form={form} onFinish={handleOk} name="control-hooks">
                <Form.Item name="title" label={t('todo.title')} rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="content" label={t('todo.content')} rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                    }}
                >
                    <Button key="back" className='mr-3' onClick={handleCancel}>
                        {t('button.cancel')}
                    </Button>
                    <Button type="primary" htmlType="submit">
                    {t('button.add')}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}