import {EShowStatus} from '../../../../../models/show.model';
import {capitalize} from '../../../../../utils/string.utils';

export const ShowStatuses = [
    {
        value: EShowStatus.upcoming,
        label: capitalize(EShowStatus.upcoming),
    },
    {
        value: EShowStatus.running,
        label: capitalize(EShowStatus.running),
    },
    {
        value: EShowStatus.closed,
        label: capitalize(EShowStatus.closed),
    },
    {
        value: EShowStatus.current,
        label: capitalize(EShowStatus.current),
    },
];
