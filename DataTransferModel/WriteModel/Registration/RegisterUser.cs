using System;
namespace WriteModel.Registration
{
    public class RegisterUser
    {
        public string UserName { get; set; }
        public byte[] Password { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public DateTime DOB { get; set; }
    }
}
