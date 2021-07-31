import styled from 'styled-components';

interface ILabel {
    small?: boolean;
}

const InputLabel = styled.div<ILabel>`
    border: none;
    color: ${props => props.theme.text.heavy};
    font-size: ${props => props.small ? '12px' : '16px'};
`;

export { InputLabel };
