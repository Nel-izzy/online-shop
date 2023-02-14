import bcryptjs from 'bcryptjs';

const users = [

    {
        name: 'Admin Hayes',
        email: 'admin@gmail.com,',
        password: bcryptjs.hashSync('abc1234', 10),
        isAdmin: true
    },
    
    {
        name: 'John Hayes',
        email: 'john@gmail.com,',
        password: bcryptjs.hashSync('abfd234', 10),
       
    },
    
    {
        name: 'Jane Hayes',
        email: 'jane@gmail.com,',
        password: bcryptjs.hashSync('abey234', 10),
        
    }
]

export default users