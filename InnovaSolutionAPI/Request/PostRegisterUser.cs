﻿using System;
using System.ComponentModel.DataAnnotations;

namespace InnovaSolutionAPI.Request
{
    public class PostRegisterUser
    {
        [Required]
        public string Password { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public DateTime DOB { get; set; }
    }
}
