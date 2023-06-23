module.exports = (sequelize,DataTypes) => {
    const Photos = sequelize.define(
        "photos",
        {
            id:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true,
            },
            userId:{
                type:DataTypes.STRING,
            },
            title:{
                type:DataTypes.STRING,   
                     },
            slug:{
                type:DataTypes.STRING,  
                      },
            description:{
                type:DataTypes.STRING,   
                     },
            mediaLocation:{
                type:DataTypes.STRING, 
                       }

        }
    )
    return Photos;
}