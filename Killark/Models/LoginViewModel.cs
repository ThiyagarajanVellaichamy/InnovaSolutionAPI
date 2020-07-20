using System.ComponentModel.DataAnnotations;

namespace Killark.Models
{
    public class LoginViewModel
    {
        [Required]
        [Display(Name = "Email Address")]
        [EmailAddress]
        public string EmailId { get; set; }

        [Required]
        [DataType(DataType.Password)]
        //[RegularExpression(@"^.{8,15}$", ErrorMessage = "The Password must be at least 8-15 characters long.")]
        [Display(Name = "Password")]
        public string Password { get; set; }

        public string ErrorMessage { get; set; }
    }

    public class RegisterViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email Address")]
        [RegularExpression(@"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$",
           ErrorMessage = "The {0} must be valid.")]
        public string EmailId { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$",
           ErrorMessage = "The {0} must be atleast 8-15 characters long with minimum 1 Upper Case, 1 Lower Case , 1 Numeric & 1 Special Character.")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm Password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        [Required]
        [Display(Name = "First Name")]
        [RegularExpression(@"^[a-zA-Z\s]+$", ErrorMessage = "Use characters only in First Name.")]
        [MaxLength(32, ErrorMessage = "First Name cannot be greater than 32 characters. ")]
        public string FirstName { get; set; }

        [Required]
        [RegularExpression(@"^[a-zA-Z\s]+$", ErrorMessage = "Use characters only in Last Name")]
        [Display(Name = "Last Name")]
        [MaxLength(32, ErrorMessage = "Last Name cannot be greater than 32 characters. ")]
        public string LastName { get; set; }

        [Required]
        [Display(Name = "Company")]
        [RegularExpression(@"^[a-zA-Z\s]+$", ErrorMessage = "Use characters only in Company Name.")]
        [MaxLength(32, ErrorMessage = "Company cannot be greater than 32 characters. ")]
        public string Company { get; set; }

        public string ErrorMessage { get; set; } = null;

        public string Title { get; set; }

        public string JobTitle { get; set; }

        public string BusinessClass { get; set; }

        [Required]
        [MaxLength(32, ErrorMessage = "Address cannot be greater than 32 characters. ")]
        public string Address { get; set; }

        public string AddressCont { get; set; }

        [Required]
        [MaxLength(32, ErrorMessage = "City cannot be greater than 32 characters. ")]
        public string City { get; set; }

        [Required]
        [MaxLength(32, ErrorMessage = "CountryState cannot be greater than 32 characters. ")]
        public string CountryState { get; set; }

        [Required]
        [MaxLength(32, ErrorMessage = "Postcode cannot be greater than 32 characters. ")]
        public string Postcode { get; set; }

        [Required]
        [MaxLength(32, ErrorMessage = "Country cannot be greater than 32 characters. ")]
        public string Country { get; set; }

        [Required]
        [RegularExpression(@"^[0-9]{10}$", ErrorMessage = "Invalid Telephone number.")]
        public string Telephone { get; set; }

        public string Fax { get; set; }
    }

    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email Address")]
        public string EmailId { get; set; }
    }
}