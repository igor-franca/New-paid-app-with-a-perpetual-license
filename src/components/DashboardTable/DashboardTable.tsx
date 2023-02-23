import ClayTable from '@clayui/table';

import swapVert from '../../assets/icons/swap-vert.svg';

import './DashboardTable.scss';
import { DashboardTableRow } from './DashboardTableRow';

export type AppProps = {
    image: string;
    name: string;
    updatedDate: string;
    updatedResponsible: string;
    updatedBy: string;
    status: string;
    selected: boolean;
    specifications: Specification[];
}

type Specification = {
    specificationKey: string;
    value: {[key: string] : string};
}
interface DashboardTableProps {
    apps: AppProps[]
}

export function DashboardTable({ apps }: DashboardTableProps) {
    return (
        <ClayTable
            className='dashboard-table-container'
            borderless
        >
            <ClayTable.Head>
                <ClayTable.Cell headingCell>
                    <div className='dashboard-table-header-name'>
                        <span
                            className='dashboard-table-header-text'
                        >
                            Name
                        </span>

                        <img
                            className='dashboard-table-header-name-icon'
                            src={swapVert}
                            alt="Swap Vert"
                        />
                    </div>
                </ClayTable.Cell>

                <ClayTable.Cell headingCell>
                    <span className='dashboard-table-header-text'>
                        Version
                    </span>

                </ClayTable.Cell>

                <ClayTable.Cell headingCell>
                    <span className='dashboard-table-header-text'>
                        Type
                    </span>
                </ClayTable.Cell>

                <ClayTable.Cell headingCell>
                    <span className='dashboard-table-header-text'>
                        Last Updated
                    </span>

                </ClayTable.Cell>

                <ClayTable.Cell headingCell>
                    <span className='dashboard-table-header-text'>
                        Rating
                    </span>

                </ClayTable.Cell>

                <ClayTable.Cell headingCell>
                    <span className='dashboard-table-header-text'>
                        Status
                    </span>
                </ClayTable.Cell>
            </ClayTable.Head>

            <ClayTable.Body>
                {apps.map((app) => (
                    <DashboardTableRow
                        app={app}
                        key={app.name}
                    />
                ))}
            </ClayTable.Body>
        </ClayTable>
    )
}