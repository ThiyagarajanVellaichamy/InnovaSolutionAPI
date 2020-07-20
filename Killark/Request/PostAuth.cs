using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Killark.Request
{
    public class PostAuth
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
