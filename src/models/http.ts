import axios from 'axios';
import {JwtService} from "../services/jwt.service";

export default axios.create({
    headers: {
        'Authorization': `Bearer ${JwtService.getJwt()}`
    }
})
