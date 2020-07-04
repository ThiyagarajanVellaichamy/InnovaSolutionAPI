using System;
namespace ReadModel.Notification
{
    public class EmailMaster
    {
        public string Subject { get; set; }
        public string Body { get; set; }
        public string[] Tos { get; set; }
        public string[] Bcc { get; set; }
        public string[] Ccs { get; set; }
    }
}
