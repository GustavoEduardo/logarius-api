import {ISuccessReturn} from '../../types/IServiceDefault';

function SuccessReturn({
    code= 200,
    status = "success",
    message = "Ação Realizada com sucesso",
    result = []
}: ISuccessReturn) {

    let successReturn: ISuccessReturn = {
        code,
        status,
        message,
        result
    };

    return successReturn
    
}



export default SuccessReturn;