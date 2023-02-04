import { pokemonData } from './pokemon';
import { Table as TableAnt, Typography, Image } from 'antd';

const { Text } = Typography;

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <Text>{text}</Text>,
    },
    {
        title: 'Number',
        dataIndex: 'number',
        key: 'number',
    },
    {
        title: 'Class',
        dataIndex: 'classification',
        key: 'classification',
        filters: [
            {
                text: 'Seed Pokémon',
                value: 'Seed Pokémon',
            },
            {
                text: 'Megaton Pokémon',
                value: 'Megaton Pokémon',
            },
            {
                text: 'Slowpoke',
                value: 'Slowpoke',
            },
        ],
        onFilter: ((value, item) => item.classification.includes(value))
    },
    {
        title: 'Maximum HP',
        dataIndex: 'maxHP',
        key: 'maxHP',
        sorter: (a, b) => a.maxHP - b.maxHP,
    },
    {
        title: 'Maximum CP',
        dataIndex: 'maxCP',
        key: 'maxCP',
    },
    {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: (src) => <Image src={src} width={150} />
    },
];

const dataPokemon = pokemonData.map(pokemon => ({
    name: pokemon.name,
    number: pokemon.number,
    classification: pokemon.classification,
    maxHP: pokemon.maxHP,
    maxCP: pokemon.maxCP,
    key: pokemon.id,
    image: pokemon.image,
}))


const Table = ({ rows = 10 }) => {

    return (
        <TableAnt
            dataSource={dataPokemon}
            columns={columns}
            pagination={{
                pageSize: rows,
                // pageSizeOptions: [30,50,100],
                // defaultPageSize: 100,
                // showSizeChanger: false,
        }} />
    )
}

export default Table;