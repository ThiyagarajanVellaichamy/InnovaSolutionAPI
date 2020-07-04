using System;
using System.ComponentModel.DataAnnotations;

namespace InnovaSolutionAPI.Request
{
    public class PostAuth
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
