import {
    Button,
    Modal,
    ModalBody,
    ModalContent, ModalFooter,
    ModalHeader, Tooltip,
    useDisclosure
} from "@nextui-org/react";
import {CiEdit, CiLock, CiMail, CiUser} from "react-icons/ci";
import React from "react";
import {MdOutlineDeleteForever} from "react-icons/md";

export default function ModalApagar() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <Tooltip color="danger" content="Apagar utilizador">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <Button isIconOnly color="danger" variant="light" onPress={onOpen}><MdOutlineDeleteForever /> </Button>
             </span>
            </Tooltip>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="top-center"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Apagar utilizador</ModalHeader>
                                <ModalBody>
                                    <p>Tem a certeza que pretende apagar este utilizador?</p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="warning" variant="flat" onPress={onClose}>
                                        Cancelar
                                    </Button>
                                    <Button color="danger" onPress={onClose}>
                                        Apagar
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </>
    );
}