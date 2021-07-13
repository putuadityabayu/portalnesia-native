import * as Applications from 'expo-application'
import {ReduxState,ReduxAction} from './types'

const initialState: ReduxState={
	user:null,
	token:null,
	session:null,
    theme:'light',
    userTheme:'auto',
    lang:'auto',
    isLogin:false,
}

const reducer=(state=initialState,action: ReduxAction): ReduxState=>{
    let payload;
    switch(action?.type){
		case "LOGIN":
            payload = (action.payload as Partial<ReduxState>)
			return {
				...state,
				user:payload.user,
				token:payload.token,
				session:payload.session,
                isLogin:true
			}
		case "LOGOUT":
			return {
                ...state,
                user:false,
                token:null,
                session:Applications.androidId,
                isLogin:false
            }
		case "SESSION":
			return {
                ...state,
                session:(action.payload as string)
            }
        case "THEME":
            payload = (action.payload as Partial<ReduxState>)
            return {
                ...state,
                theme:payload.theme,
                userTheme:payload.userTheme
            }
        case "LANG":
            return {
                ...state,
                lang:(action.payload as 'id'|'en'|'auto')
            }
		case "MANUAL":
            payload = (action.payload as Partial<ReduxState>)
			return {
				...state,
				...payload
			}
		default:
			return state
	}
}

export default reducer