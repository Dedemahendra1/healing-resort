'use client'

import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import { useState, useCallback} from 'react';
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle} from 'react-icons/fc';



import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../input/Input";
import Button from "../Button";
import { signIn } from "next-auth/react";



const RegisterModal = () => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit , formState: {errors}} = useForm<FieldValues> ({
        defaultValues : {
            name: '',
            email: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post(`/api/register`,data)
        .then (() => {
            registerModal.onClose()
        })
        .catch((error) => {
            toast.error("Something wrong")
        })
        .finally(() => {
            setIsLoading(false);
        })
        
    }

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    },[registerModal, loginModal])

    const bodyContent = (
        <div className="flex flex-col  gap-4">
            <Heading 
            title="Welcome to Healing."
            subtitle="create your account"
            />
            
            <Input  
            id="email"
            label="Email"
            disabled={isLoading}
            register={register}
            errors={errors}
            />

            <Input 
            id="name"
            label="Name"
            disabled={isLoading}
            register={register}
            errors={errors}
            />

            <Input 
            id="password"
            type="password"
            label="Password"
            disabled={isLoading}
            register={register}
            errors={errors}
            />
            
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3" >
            <hr/>
            <Button 
            outline
            label="continue with google"
            icon={FcGoogle}
            onClick={() => signIn('google')}
            />

            <Button 
            outline
            label="continue with github"
            icon={AiFillGithub}
            onClick={() => signIn('github')}
            />

            <div className=" text-neutral-500 text-center mt-4 font-light">
                <p>Already have account ? 
                    <span 
                    onClick={toggle}
                    className="text-neutral-800 cursor-pointer hover:underline">
                        Log In
                    </span>
                </p>
            </div>
        </div>
    )


  return ( 
    <Modal 
    disabled={isLoading}
    title="Register"
    actionLabel="Continue"
    isOpen={registerModal.isOpen}
    onSubmit={handleSubmit(onSubmit)}
    onClose={registerModal.onClose}
    body={bodyContent}
    footer={footerContent}
    />
  )
}

export default RegisterModal