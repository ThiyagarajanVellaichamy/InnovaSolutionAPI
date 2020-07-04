using System;
namespace ServiceProvider.Contracts.Persistance
{
    public interface IEncryption
    {
        string Encrypt(string input);
        string Decrypt(string input);
        void EncryptFile(string path);
        void DecryptFile(string path);
        byte[] GetComputedHashKey(string data);
    }
}
