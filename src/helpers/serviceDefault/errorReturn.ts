import {IErrorReturn} from '../../types/IServiceDefault';

function ErrorReturn({
    code= 400,
    status = "error",
    message = "Ocorreu um erro",
    result = []
}: IErrorReturn) {

    let errorReturn: IErrorReturn = {
        code,
        status,
        message,
        result
    };

    return errorReturn
    
}

export default ErrorReturn;