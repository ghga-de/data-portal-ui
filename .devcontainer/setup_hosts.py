#!/usr/bin/env python3

"""
This is a helper script to set up the hosts file for testing.

It adds a line to the hosts file that allows to resolve the domain name of
the portal properly even if the docker host has changed it for local testing.
"""

import re
import dns.resolver

name = "data.ghga-dev.de"  # host name of the portal


def get_ip():
    """Get the IP address of the portal"""
    resolver = dns.resolver.Resolver()
    resolver.nameservers = ["8.8.8.8", "8.8.4.4"]  # Google nameserver
    ip = str(resolver.resolve(name)[0])
    if (ip.count('.') != 3 or not ip.replace('.', '').isdigit()
            or ip.startswith(("0.", "127.", "10."))):
        raise RuntimeError(f"Cannot resolve {name}, got {ip}")
    return ip


def setup():
    """Set up the hosts file."""
    ip = get_ip()
    with open("/etc/hosts", "r") as hostsfile:
        hosts = hostsfile.read()
    if not hosts.endswith("\n"):
        hosts += "\n"
    re_name = name.replace(".", "\\.")
    new_hosts, num_subs = re.subn(
        rf"^[0-9.]+\s+{re_name}$", f"{ip} {name}", hosts, flags=re.M)
    if num_subs:
        if hosts == new_hosts:
            print("Host file was already set up.")
        else:
            with open("/etc/hosts", "w") as hostsfile:
                hostsfile.write(new_hosts)
            print("Host file has been updated.")
    else:
        host = f"{ip} {name}\n"
        with open("/etc/hosts", "a") as hostsfile:
            hostsfile.write(host)
        print("Host file has been set up.")


if __name__ == "__main__":
    setup()
