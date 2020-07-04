using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModel.Audit
{
    [Table("User", Schema = "Audit")]
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public byte[] Password { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public DateTime DOB { get; set; }
        public bool IsAccountVerified { get; set; }
        public bool IsActive { get; set; }
        public Guid CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
