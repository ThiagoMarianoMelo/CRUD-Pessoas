using RestAPIModel.Models.MPessoa;
using RestAPIModel.Connections.TesteDataBase;
using Npgsql;
using System.Text.Json;


namespace RestAPIModel.Rules.RPessoa{
    
    public class RPessoa{

        public List<MPessoa> returningAll(){

            List<MPessoa> lstPessoa = new List<MPessoa>();

            var conn =  new TesteDataBase().TesteDataBaseConnection();
               
            conn.Open();
            var cmd = new NpgsqlCommand("select \"ID\",\"Nome\",\"Altura\",\"Idade\" from public.\"Pessoa\"", conn);
            var reader = cmd.ExecuteReader();
            while (reader.Read()){
                MPessoa pessoa = new MPessoa();
                pessoa.ID     = reader.GetInt16(0);
                pessoa.nome   = reader.GetString(1);
                pessoa.altura = reader.GetFloat(2);
                pessoa.idade  = reader.GetInt32(3);
                lstPessoa.Add(pessoa);
            }
            conn.Close();
               

           return lstPessoa;
        }


        public void insertOnePerson(MPessoa pessoa){ 
            
            var conn = new TesteDataBase().TesteDataBaseConnection();

            conn.Open();
            var cmd = new NpgsqlCommand("insert into public.\"Pessoa\"(\"Nome\",\"Altura\",\"Idade\") Values(@Nome,@Altura,@Idade)",conn);

            NpgsqlParameter paramNome  = new NpgsqlParameter();
            paramNome.ParameterName = "@Nome";
            paramNome.Value = pessoa.nome;
            cmd.Parameters.Add(paramNome);

            NpgsqlParameter paramAltura  = new NpgsqlParameter();
            paramAltura.ParameterName = "@Altura";
            paramAltura.Value = pessoa.altura;
            cmd.Parameters.Add(paramAltura);

            NpgsqlParameter paramIdade  = new NpgsqlParameter();
            paramIdade.ParameterName = "@Idade";
            paramIdade.Value = pessoa.idade;
            cmd.Parameters.Add(paramIdade);

            var writer =  cmd.ExecuteReader();

            conn.Close();

        }
        public void deletingOnePerson(MPessoa pessoa){

            var conn = new TesteDataBase().TesteDataBaseConnection();

            conn.Open();
            var cmd = new NpgsqlCommand("delete from public.\"Pessoa\" where \"Nome\" = @Nome",conn);

            NpgsqlParameter paramNome = new NpgsqlParameter();
            paramNome.ParameterName = "@Nome";
            paramNome.Value = pessoa.ID;
            cmd.Parameters.Add(paramNome);

            var deleter = cmd.ExecuteReader();

            conn.Close();

        }

        public void changeAtributesPerson(MPessoa pessoa){

            var conn = new TesteDataBase().TesteDataBaseConnection();

            conn.Open();
            var cmd = new NpgsqlCommand("update public.\"Pessoa\" set \"Nome\" = @Nome, \"Idade\" = @Idade, \"Altura\" = @Altura where \"ID\" = @ID",conn);

            NpgsqlParameter paramNome = new NpgsqlParameter();
            paramNome.ParameterName = "@Nome";
            paramNome.Value = pessoa.nome;
            cmd.Parameters.Add(paramNome);

            NpgsqlParameter paramIdade = new NpgsqlParameter();
            paramIdade.ParameterName = "@Idade";
            paramIdade.Value = pessoa.idade;
            cmd.Parameters.Add(paramIdade);

            NpgsqlParameter paramAltura = new NpgsqlParameter();
            paramAltura.ParameterName = "@Altura";
            paramAltura.Value = pessoa.altura;
            cmd.Parameters.Add(paramAltura);

            NpgsqlParameter paramID = new NpgsqlParameter();
            paramID.ParameterName = "@ID";
            paramID.Value = pessoa.ID;
            cmd.Parameters.Add(paramID);

            var deleter = cmd.ExecuteReader();

            conn.Close();
        }

    }
}