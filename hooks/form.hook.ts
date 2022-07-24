import { useState } from "react"

function useForm <T>(){
    const [formData, setFormData] = useState<T>()

    return formData;
}