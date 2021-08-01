import styled from 'styled-components';

interface ILabel {
    small?: boolean;
    mediumFont?: boolean;
}

const InputLabel = styled.div<ILabel>`
    border: none;
    color: ${props => props.mediumFont ? props.theme.text.medium : props.theme.text.heavy};
    font-size: ${props => props.small ? '12px' : '16px'};
`;

export { InputLabel };
