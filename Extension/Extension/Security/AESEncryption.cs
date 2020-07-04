using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using ServiceProvider.Contracts.Persistance;

namespace Extension.Security
{
    public class AESEncryption : IEncryption
    {
        private const string SECUREDKEY = "OTEzOTVCNkQtRDBGNy00N0U4LUI4NDktMEZBRkNBOEIyRkZG";
        /// <summary>
        /// Initialization AES
        /// </summary>
        /// <param name="appSetting"></param>
        public AESEncryption()
        {
        }
        /// <summary>
        /// To Encrypt
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public string Encrypt(string input)
        {
            byte[] bytesToBeEncrypted = Encoding.UTF8.GetBytes(input);
            byte[] passwordBytes = Encoding.UTF8.GetBytes(SECUREDKEY);
            passwordBytes = SHA256.Create().ComputeHash(passwordBytes);
            byte[] bytesEncrypted = AESEncrypt(bytesToBeEncrypted, passwordBytes);
            string result = Convert.ToBase64String(bytesEncrypted);
            return result;
        }
        /// <summary>
        /// To Decrypt
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public string Decrypt(string input)
        {
            byte[] bytesToBeDecrypted = Convert.FromBase64String(input);
            byte[] passwordBytes = Encoding.UTF8.GetBytes(SECUREDKEY);
            passwordBytes = SHA256.Create().ComputeHash(passwordBytes);
            byte[] bytesDecrypted = AESDecrypt(bytesToBeDecrypted, passwordBytes);
            string result = Encoding.UTF8.GetString(bytesDecrypted);
            return result;
        }
        /// <summary>
        /// To Encrypt file.
        /// </summary>
        /// <param name="path"></param>
        public void EncryptFile(string path)
        {
            byte[] bytesToBeEncrypted = File.ReadAllBytes(path);
            byte[] passwordBytes = Encoding.UTF8.GetBytes(SECUREDKEY);
            passwordBytes = SHA256.Create().ComputeHash(passwordBytes);
            byte[] bytesEncrypted = AESEncrypt(bytesToBeEncrypted, passwordBytes);
            string fileEncrypted = path;
            File.WriteAllBytes(fileEncrypted, bytesEncrypted);
        }
        /// <summary>
        /// To Decrypt file
        /// </summary>
        /// <param name="path"></param>
        public void DecryptFile(string path)
        {
            byte[] bytesToBeDecrypted = File.ReadAllBytes(path);
            byte[] passwordBytes = Encoding.UTF8.GetBytes(SECUREDKEY);
            passwordBytes = SHA256.Create().ComputeHash(passwordBytes);
            byte[] bytesDecrypted = AESDecrypt(bytesToBeDecrypted, passwordBytes);
            File.WriteAllBytes(path, bytesDecrypted);
        }

        /// <summary>
        /// To Get encrypted bytes
        /// </summary>
        /// <param name="bytesToBeEncrypted"></param>
        /// <param name="passwordBytes"></param>
        /// <returns></returns>
        private byte[] AESEncrypt(byte[] bytesToBeEncrypted, byte[] passwordBytes)
        {
            byte[] encryptedBytes = null;
            byte[] saltBytes = new byte[] { 29, 1, 34, 1, 18, 8, 2, 3 };

            using (MemoryStream ms = new MemoryStream())
            {
                using (RijndaelManaged AES = new RijndaelManaged())
                {
                    AES.KeySize = 256;
                    AES.BlockSize = 128;

                    var key = new Rfc2898DeriveBytes(passwordBytes, saltBytes, 1000);
                    AES.Key = key.GetBytes(AES.KeySize / 8);
                    AES.IV = key.GetBytes(AES.BlockSize / 8);

                    AES.Mode = CipherMode.CBC;

                    using (var cs = new CryptoStream(ms, AES.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(bytesToBeEncrypted, 0, bytesToBeEncrypted.Length);
                        cs.Close();
                    }
                    encryptedBytes = ms.ToArray();
                }
            }

            return encryptedBytes;
        }
        /// <summary>
        /// To Decript bytes
        /// </summary>
        /// <param name="bytesToBeDecrypted"></param>
        /// <param name="passwordBytes"></param>
        /// <returns></returns>
        private byte[] AESDecrypt(byte[] bytesToBeDecrypted, byte[] passwordBytes)
        {
            byte[] decryptedBytes = null;
            byte[] saltBytes = new byte[] { 29, 1, 34, 1, 18, 8, 2, 3 };

            using (MemoryStream ms = new MemoryStream())
            {
                using (RijndaelManaged AES = new RijndaelManaged())
                {
                    AES.KeySize = 256;
                    AES.BlockSize = 128;

                    var key = new Rfc2898DeriveBytes(passwordBytes, saltBytes, 1000);
                    AES.Key = key.GetBytes(AES.KeySize / 8);
                    AES.IV = key.GetBytes(AES.BlockSize / 8);

                    AES.Mode = CipherMode.CBC;

                    using (var cs = new CryptoStream(ms, AES.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(bytesToBeDecrypted, 0, bytesToBeDecrypted.Length);
                        cs.Close();
                    }
                    decryptedBytes = ms.ToArray();
                }
            }
            return decryptedBytes;
        }

        public byte[] GetComputedHashKey(string data)
        {
            return System.Text.Encoding.UTF8.GetBytes(ComputeHash(data));
        }
        /// <summary>
        /// Hashing Password string
        /// </summary>
        /// <param name="rawData"></param>
        /// <returns></returns>
        private string ComputeHash(string rawData)
        {
            // Create a SHA256   
            using (SHA256 sha256Hash = SHA256.Create())
            {
                // ComputeHash - returns byte array  
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));

                // Convert byte array to a string   
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }
    }
}
