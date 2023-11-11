'use client'

import { signIn } from "next-auth/react"
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import { useState, useCallback} from 'react';
import { useRouter } from "next/navigation"

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle} from 'react-icons/fc';



import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../input/Input";
import Button from "../Button";





const LoginModal = () => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const { register, handleSubmit , formState: {errors}} = useForm<FieldValues> ({
        defaultValues : {
            email: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then ((callback) => {
            setIsLoading(false);

            if(callback?.ok) {
                toast.success('Logged in successfully')
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error) {
                toast.error(callback.error)
            }
        })
        
    }

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
      },[loginModal, registerModal]);

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
                <p>First time using Airbnb? 
                    <span 
                    onClick={toggle}
                    className="text-neutral-800 cursor-pointer hover:underline">
                        Create an account
                    </span>
                </p>
            </div>
        </div>
    )


  return ( 
    <Modal 
    disabled={isLoading}
    isOpen={loginModal.isOpen}
    title="Login"
    actionLabel="Continue"
    onClose={loginModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}

export default LoginModal;