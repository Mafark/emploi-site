import React from "react";
import Validation from "react-validation";
import {isEmpty, isEmail, isInt} from "validator";

/*
 * Rules for Validation lib
 * true - correct
 * false - warring
 */

Object.assign(Validation.rules, {
    required: {
        rule: (value) => {
            return !isEmpty(value);
        },
        hint: value => {
            return <span>Обязательное поле</span>
        }
    },
    noSpace: {
        rule: (value) => {
            return value.indexOf(" ") < 0;
        },
        hint: value => {
            return <span>Пробелы не допустимы.</span>
        }
    },
    email: {
        rule: value => {
            return isEmail(value);
        },
        hint: value => {
            return <span>{value} не Email.</span>
        }
    },
    year: {
        rule: value => {
            return isInt(value, {min: 1900, max: 2030});
        },
        hint: value => {
            return <span>{value} не корректный год.</span>
        }
    },
    currency: {
        rule: value => {
            return isInt(value, {min: 1, max: 900000000000});
        },
        hint: value => {
            return <span>Не корректное значение.</span>
        }
    },
    isStr: {
        rule: value => {
            let correct = true;
            for(let i = 0; i < value.length; i++){
                if(correct){
                    correct = /[A-Za-zа-яА-ЯёЁ ]/.test(value[i]);
                }
            }
            return correct;
        },
        hint: value => {
            return <span>Разрешены только буквы.</span>
        }
    },
    noSpace: {
        rule: value => {
            return value.indexOf(" ") < 0;
        },
        hint: value => {
            return <span>Пробелы запрещены.</span>
        }
    },
    api: {
        hint: value => (
            <button
                className="form-error is-visible"
            >
                API Error on "{value}" value. Focus to hide.
            </button>
        )
    }
});