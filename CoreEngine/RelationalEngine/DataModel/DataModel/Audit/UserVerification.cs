using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModel.Audit
{
    [Table("UserVerification", Schema = "Audit")]
    public class UserVerification
    {
        [Key]
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Token { get; set; }
        public DateTime ExpiredOn { get; set; }
        public bool IsActive { get; set; }
        public DateTime GeneratedOn { get; set; }
    }
}
