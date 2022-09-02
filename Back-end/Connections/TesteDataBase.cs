using Npgsql;

namespace RestAPIModel.Connections.TesteDataBase{
    public class TesteDataBase{

        public NpgsqlConnection TesteDataBaseConnection(){
            
            var connString = "Host=localhost;Username=postgres;Password=shtj@27075;Database=Test";

            return new NpgsqlConnection(connString);
        }
    }
}