import knex from '../database/connection';
import {Request, Response} from 'express';

class PointsController {
    async index(request: Request, response: Response){
        // três filtros, sendo cidade, uf, items

        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*')

        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `http://192.168.0.109:3333/uploads/${point.image}`,
            };
        });   

        return response.json(serializedPoints);
    }

    async show(request: Request, response: Response){
        const id = request.params.id;

        //buscar o ponto atráves do id
        const point = await knex('points').where('id', id).first();

        if(!point) {
            return response.status(400).json({ message: 'Point not found' })
        }

        const serializedPoint = {
            ...point,
            image_url: `http://192.168.0.109:3333/uploads/${point.image}`,
        }

        // Quero listar todos os itens que tem relação com esse ponto
        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');
        /**
         * Select * from items
         * Join point_items On items.id = point_items.item_id
         * where point_items.point = {id}
         */

        return response.status(200).json({ point: serializedPoint, items });
    }

    async create(request: Request, response: Response){
        // const name = request.body.name;
        // desestruturação 

        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;

        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        }

        const ids = await knex('points').insert(point);
        const point_id = ids[0];

        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: Number) => {
                return {
                    item_id,
                    point_id
                };
        });

        await knex('point_items').insert(pointItems);

        return response.json({ 
            id: point_id,
            // "..." pega todas as informações que eu tenho dentro de um objeto para retornar dentro de outro objeto 
            ...point
        });
    };
};

export default PointsController;