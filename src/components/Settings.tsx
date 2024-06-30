import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { login, toggleSettings, updateCredentialField } from "../store/reducers/settingsReducer";



function Settings() {
    const dispatch = useAppDispatch()

    const { email, password } = useAppSelector(store => store.settings.credentials)

    const open = useAppSelector(store => store.settings.open)
    const error = useAppSelector(store => store.settings.error)
    const loading = useAppSelector(store => store.settings.loading)

    const pseudo = useAppSelector(store => store.settings.pseudo)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login())
    }

    return (
        <form className={ open ? "login--open login" : "login" } onSubmit={ handleSubmit } >

            <button type="button" className="login__toggle" onClick={ () => dispatch(toggleSettings()) }>❌</button>

            <input className="login__email"
                type="email"
                placeholder="Email..."
                value={ email }
                onChange={ (e) => dispatch(updateCredentialField({
                    value: e.target.value,
                    field: "email"
                })) } 
            />

            <input className="login__password"
                type="password"
                placeholder="Password..."
                value={ password } 
                onChange={ (e) => dispatch(updateCredentialField({
                    value: e.target.value,
                    field: "password"
                })) } 
            />

            { pseudo !== "" ? <p>Bienvenue { pseudo } ! </p> : (<button className="login__submit" type="submit" >

                {
                    loading ? "⚙️" : "Envoyer"
                }

            </button>) }
            { error !== "" && <p> { error }</p> }

        </form>)
}
export default Settings