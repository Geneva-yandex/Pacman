import * as React from 'react';
import ReactTooltip, {TooltipProps} from 'react-tooltip';
import bem from 'easy-bem';
import './Tooltip.scss';

const b = bem('Tooltip');

function Tooltip(props: React.PropsWithChildren<{ id: string, tooltip: string } & TooltipProps>) {
    const {id, tooltip, children} = props;
    return <div className={b()} data-tip data-for={id}>
        {children}
        <ReactTooltip {...props} effect="solid" id={id}>{tooltip}</ReactTooltip>
    </div>;
}

export default Tooltip;
