import Cloth from '../../../lib/models/cloth';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { categoria, cor, tamanho, userId} = req.body;

    try {
        // cria a roupa na base de dados
        const cloth = await Cloth.createCloth(categoria, cor, tamanho, userId);

        return res.status(201).json({ message: 'Peça adicionada com sucesso'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao adicionar peça' });
    }
}
