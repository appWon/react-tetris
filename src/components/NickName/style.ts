import styled from "styled-components";

export const NickNameContainer = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    font-family: "dungGeunMo";
    background-color: rgba(0, 0, 0, 0.5);
`;

export const SettingNickNameContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    gap: 10px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0);
    box-shadow: 0px 0px 5px rgb(255 255 255 / 50%);
    color: white;

    form {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    div {
        display: flex;
        align-items: center;

        background-color: white;

        input {
            width: 100px;
            padding: 5px;
            font-family: "dungGeunMo";
            border: unset;
            text-align: right;
            &:focus {
                outline: unset;
            }
        }
    }

    button {
        font-size: 20px;
        border: unset;
        padding: 2px;
        background: white;
        cursor: pointer;
        font-family: "dungGeunMo";
    }
`;
